# users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('prénom'), max_length=150)
    last_name = models.CharField(_('nom'), max_length=150)

    # ON GARDE username mais on le rend optionnel
    username = models.CharField(
        _('pseudonyme'), max_length=150, unique=True, blank=True, null=True
    )

    LEVEL_CHOICES = [
        ('A1', 'A1 - Débutant'),
        ('A2', 'A2 - Élémentaire'),
        ('B1', 'B1 - Intermédiaire'),
        ('B2', 'B2 - Intermédiaire avancé'),
        ('C1', 'C1 - Avancé'),
        ('C2', 'C2 - Maîtrise'),
    ]
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES, default='A1')

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    streak = models.PositiveIntegerField(default=0)
    total_xp = models.PositiveIntegerField(default=0)

    # ÇA RÉSOUT LES ERREURS DE CLASH !
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name='custom_user_set',  # CHANGÉ ICI
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_set',  # CHANGÉ ICI
        related_query_name='user',
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    # Pour éviter les problèmes avec username=None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']