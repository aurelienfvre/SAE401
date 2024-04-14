<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\UserProgress; // Assurez-vous d'avoir une entité UserProgress
use Doctrine\ORM\EntityManagerInterface;

class UserProgressController extends AbstractController
{
#[Route('/api/user-progress/{id}', name: 'api_user_progress_update', methods: ['PUT', 'PATCH', 'POST'])]
public function update(Request $request, UserProgress $userProgress, EntityManagerInterface $entityManager): Response
{
$data = json_decode($request->getContent(), true);

if (isset($data['score'])) {
$userProgress->setScore($data['score']);
}

if (isset($data['progress'])) {
$userProgress->setProgress($data['progress']);
}

$entityManager->persist($userProgress);
$entityManager->flush();

return $this->json([
'status' => 'success',
'data' => $userProgress
]);
}
}