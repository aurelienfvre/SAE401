<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ProfilePictureType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;





class ProfileController extends AbstractController
{
    #[Route('/api/profile/update', name: 'api_profile_update', methods: ['POST'])]
    public function updateProfile(Request $request, TokenStorageInterface $tokenStorage, EntityManagerInterface $entityManager, JWTTokenManagerInterface $JWTManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = $tokenStorage->getToken()->getUser();

        if (!$user instanceof User) {
            return $this->json(['message' => 'User not found'], JsonResponse::HTTP_FORBIDDEN);
        }

        // Récupération et mise à jour des champs textuels
        $email = $request->request->get('email', $user->getEmail());
        $firstname = $request->request->get('firstname', $user->getFirstname());
        $lastname = $request->request->get('lastname', $user->getLastname());
        $pseudo = $request->request->get('pseudo', $user->getPseudo());
        $password = $request->request->get('password');

        $user->setEmail($email);
        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $user->setPseudo($pseudo);

        // Gérer l'upload de la photo de profil
        $file = $request->files->get('profilePicture');
        if ($file) {
            $filename = sprintf('%s.%s', uniqid(), $file->guessExtension());
            try {
                $file->move(
                    $this->getParameter('profile_pictures_directory'),
                    $filename
                );
                $user->setProfilePicture($filename); // Stockez juste le nom du fichier
            } catch (FileException $e) {
                return $this->json(['message' => 'Could not upload the file'], JsonResponse::HTTP_BAD_REQUEST);
            }
        }

        // Gérer le changement de mot de passe ici si nécessaire
        if (!empty($password)) {
            $user->setPassword($passwordHasher->hashPassword($user, $password));
        }

        $entityManager->persist($user);
        $entityManager->flush();

        // Générer un nouveau token JWT avec les informations mises à jour de l'utilisateur
        $newToken = $JWTManager->create($user);

        // Retourner le nouveau token dans la réponse
        return $this->json([
            'message' => 'Profile updated successfully',
            'newToken' => $newToken,
            'user' => [
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'pseudo' => $user->getPseudo(),
                'profilePicture' => '/uploads/profile_pictures/' . $user->getProfilePicture(), // Assurez-vous que cette URL soit accessible publiquement
            ]
        ]);
    }


}