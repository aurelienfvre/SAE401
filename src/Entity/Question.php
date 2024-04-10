<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource()]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'questions')]
    private ?Quiz $quiz = null;

    #[ORM\Column(length: 255)]
    private ?string $contentFr = null;

    #[ORM\Column(length: 255)]
    private ?string $contentEn = null;

    #[ORM\Column(length: 255)]
    private ?string $explanationTitleFr = null;

    #[ORM\Column(length: 255)]
    private ?string $explanationTitleEn = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $explanationContentFr = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $explanationContentEn = null;

    #[ORM\OneToMany(targetEntity: Answer::class, mappedBy: 'question')]
    private Collection $answers;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuiz(): ?Quiz
    {
        return $this->quiz;
    }

    public function setQuiz(?Quiz $quiz): static
    {
        $this->quiz = $quiz;

        return $this;
    }

    public function getContentFr(): ?string
    {
        return $this->contentFr;
    }

    public function setContentFr(string $contentFr): static
    {
        $this->contentFr = $contentFr;

        return $this;
    }

    public function getContentEn(): ?string
    {
        return $this->contentEn;
    }

    public function setContentEn(string $contentEn): static
    {
        $this->contentEn = $contentEn;

        return $this;
    }

    public function getExplanationTitleFr(): ?string
    {
        return $this->explanationTitleFr;
    }

    public function setExplanationTitleFr(string $explanationTitleFr): static
    {
        $this->explanationTitleFr = $explanationTitleFr;

        return $this;
    }

    public function getExplanationTitleEn(): ?string
    {
        return $this->explanationTitleEn;
    }

    public function setExplanationTitleEn(string $explanationTitleEn): static
    {
        $this->explanationTitleEn = $explanationTitleEn;

        return $this;
    }

    public function getExplanationContentFr(): ?string
    {
        return $this->explanationContentFr;
    }

    public function setExplanationContentFr(string $explanationContentFr): static
    {
        $this->explanationContentFr = $explanationContentFr;

        return $this;
    }

    public function getExplanationContentEn(): ?string
    {
        return $this->explanationContentEn;
    }

    public function setExplanationContentEn(string $explanationContentEn): static
    {
        $this->explanationContentEn = $explanationContentEn;

        return $this;
    }

    /**
     * @return Collection<int, Answer>
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): static
    {
        if (!$this->answers->contains($answer)) {
            $this->answers->add($answer);
            $answer->setQuestion($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): static
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuestion() === $this) {
                $answer->setQuestion(null);
            }
        }

        return $this;
    }
}
