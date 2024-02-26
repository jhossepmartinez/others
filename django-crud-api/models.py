# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Permissions(models.Model):
    id_permission = models.AutoField(primary_key=True)
    page_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'permissions'


class Role(models.Model):
    id_role = models.AutoField(primary_key=True)
    name_role = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'role'


class RolePermissions(models.Model):
    id_role = models.ForeignKey(Role, models.DO_NOTHING, db_column='id_role')
    id_permission = models.ForeignKey(Permissions, models.DO_NOTHING, db_column='id_permission')
    is_active = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'role_permissions'


class Users(models.Model):
    id_user = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    id_role = models.ForeignKey(Role, models.DO_NOTHING, db_column='id_role', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
