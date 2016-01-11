from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser

#class User(AbstractBaseUser):
#    """
#    Custom user class.
#    """
#    email = models.EmailField('email address', unique=True, db_index=True)
#
#    #For django
#    USERNAME_FIELD = 'email'
#
#    #human-readable representation
#    def __unicode__(self):
#        return self.email