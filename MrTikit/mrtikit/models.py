from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save

class UserProfile(models.Model): 
	# This field is required. 
	user = models.OneToOneField(User)

	# Other Fields
	fb_token = models.CharField(max_length=200)
    #homepage = models.URLField()
    #gender = models.CharField(max_length=140)  
    #employer = models.ForeignKey(Employer)
    #profile_picture = models.ImageField(upload_to='thumbpath', blank=True)

#https://docs.djangoproject.com/en/1.4/topics/auth/
def create_user_profile(sender, instance, created, **kwargs):
    if created:
       UserProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)