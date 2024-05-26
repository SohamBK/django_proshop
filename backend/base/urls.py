from django.urls import path
from . import views

urlpatterns =[
    path("", views.getRoutes, name="routes"),
    path('products/', views.getProducts, name='products'),
    path('product/<str:pk>/', views.getProduct, name='product'),
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/register/', views.registerUser, name='register'),
    path('user/profile/', views.getUserProfile, name='user-profile'),
    path('users/', views.getUsers, name='users'),
]