# Generated by Django 4.0.5 on 2022-08-09 10:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0003_alter_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='full_name',
        ),
    ]
