<?php

namespace App\Entity;

use App\Repository\UserProgressRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: UserProgressRepository::class)]
#[ApiResource()]
class UserProgress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[ORM\Column]
    private ?int $oceansXp = null;

    #[ORM\Column]
    private ?int $jungleForestXp = null;

    #[ORM\Column]
    private ?int $desertXp = null;

    #[ORM\Column]
    private ?int $arcticXp = null;

    #[ORM\Column]
    private ?int $totalCorrectAnswers = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getOceansXp(): ?int
    {
        return $this->oceansXp;
    }

    public function setOceansXp(int $oceansXp): static
    {
        $this->oceansXp = $oceansXp;

        return $this;
    }

    public function getJungleForestXp(): ?int
    {
        return $this->jungleForestXp;
    }

    public function setJungleForestXp(int $jungleForestXp): static
    {
        $this->jungleForestXp = $jungleForestXp;

        return $this;
    }

    public function getDesertXp(): ?int
    {
        return $this->desertXp;
    }

    public function setDesertXp(int $desertXp): static
    {
        $this->desertXp = $desertXp;

        return $this;
    }

    public function getArcticXp(): ?int
    {
        return $this->arcticXp;
    }

    public function setArcticXp(int $arcticXp): static
    {
        $this->arcticXp = $arcticXp;

        return $this;
    }

    public function getTotalCorrectAnswers(): ?int
    {
        return $this->totalCorrectAnswers;
    }

    public function setTotalCorrectAnswers(int $totalCorrectAnswers): static
    {
        $this->totalCorrectAnswers = $totalCorrectAnswers;

        return $this;
    }
}
