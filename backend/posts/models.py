from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    body   = models.TextField(blank=True,null=True)
    image  = models.ImageField(upload_to='post/',blank=True,null=True)
    likes  = models.ManyToManyField(get_user_model(),blank=True,related_name='likes')
    timestamp = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        if self.body:
            return self.body
        return str(self.pk)

class Comment(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='comments')
    author = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    body = models.TextField()

    class Meta:
        ordering = ('-id',)
        
    def __str__(self):
        return self.body