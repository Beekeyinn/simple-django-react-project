from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from api.user.forms import UserChangeForm, UserCreationForm

# Register your models here.


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = (
        'email', 'username', 'phone', 'gender',
        'session_token', 'is_active', 'is_admin',
        'is_staff', 'is_superuser')
    list_filter = ('is_admin', 'is_active', 'is_superuser')

    fieldsets = (
        (None, {"fields": ('email', 'password'), }),
        ('Personal Info',
         {'fields': ('username', 'phone', 'gender')}),
        ('Permissions',
         {
             'fields':
             (
                 'is_active', 'is_admin', 'is_staff',
                 'is_superuser', 'groups',
                 'user_permissions',
             )
         }
         ),
    )

    add_fieldsets = ((None, {'classes': ('wide',), 'fields': (
        'username', 'email', 'password1', 'password2'), }), )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
