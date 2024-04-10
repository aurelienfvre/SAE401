<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class ProfilePictureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('profilePicture', FileType::class, [
                'label' => 'Photo de profil (fichier image)',
                'mapped' => false, // Ne pas mapper ce champ directement à une propriété d'entité
                'required' => true,
                'constraints' => [
                    new File([
                        'maxSize' => '5M', // Limite la taille du fichier à 5M
                        'mimeTypes' => [ // Spécifie les types de fichiers autorisés
                            'image/jpeg',
                            'image/png',
                            'image/webp',
                        ],
                        'mimeTypesMessage' => 'Veuillez télécharger une image valide',
                    ])
                ],
            ])
            ->add('save', SubmitType::class, ['label' => 'Mettre à jour']); // Bouton pour soumettre le formulaire
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configurez vos options de formulaire ici si nécessaire
        ]);
    }
}
