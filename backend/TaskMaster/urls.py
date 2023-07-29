from django.urls import path, include
from rest_framework.routers import DefaultRouter
from TaskMaster.views import *
router = DefaultRouter()
router.register('Tasks', TaskViewSet, basename="task")
router.register('Customers', CustomerViewSet, basename="customer")
urlpatterns = [
    path('', include(router.urls) ),
]