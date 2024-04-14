<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;

use App\Repository\AnswerRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: AnswerRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['answer:read']],
            paginationEnabled: false
        ),
        new Get(
            uriTemplate: '/answers/{id}',
            normalizationContext: ['groups' => ['answer:item']]
        ),
        new Post(normalizationContext: ['groups' => ['answer:item']]),
        new Put(normalizationContext: ['groups' => ['answer:item']]),
        new Delete(normalizationContext: ['groups' => ['answer:item']])
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['question' => 'exact'])]
class Answer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Question $question = null;

    #[ORM\Column(length: 255)]
    #[Groups(["answer:read", "answer:item"])]
    private ?string $contentFr = null;

    #[ORM\Column(length: 255)]
    #[Groups(["answer:read", "answer:item"])]
    private ?string $contentEn = null;

    #[ORM\Column]
    #[Groups(["answer:read", "answer:item"])]
    private ?bool $isCorrect = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getContentFr(): ?string
    {
        return $this->contentFr;
    }

    public function setContentFr(string $contentFr): self
    {
        $this->contentFr = $contentFr;

        return $this;
    }

    public function getContentEn(): ?string
    {
        return $this->contentEn;
    }

    public function setContentEn(string $contentEn): self
    {
        $this->contentEn = $contentEn;

        return $this;
    }

    public function isIsCorrect(): ?bool
    {
        return $this->isCorrect;
    }

    public function setIsCorrect(bool $isCorrect): self
    {
        $this->isCorrect = $isCorrect;

        return $this;
    }
}
