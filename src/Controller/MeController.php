<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class MeController extends AbstractController
{
    private TokenStorageInterface $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $token = $this->tokenStorage->getToken();
        if (null === $token) {
            return $this->json(['message' => 'Token not found'], JsonResponse::HTTP_FORBIDDEN);
        }

        $user = $token->getUser();
        if (!is_object($user)) {
            return $this->json(['message' => 'User not found'], JsonResponse::HTTP_FORBIDDEN);
        }

        $userData = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'pseudo' => $user->getPseudo(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'roles' => $user->getRoles(),
            'profilePicture' => $user->getProfilePictureUrl(), // Utilisez la méthode pour obtenir l'URL de l'image
            'createdAt' => $user->getCreatedAt()->format('Y-m-d H:i:s'),
            'updatedAt' => $user->getUpdatedAt()->format('Y-m-d H:i:s'),
        ];

        return $this->json($userData);
    }
}
