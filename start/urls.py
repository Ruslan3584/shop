from django.conf.urls import url, include
from django.contrib import admin
from start import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
]