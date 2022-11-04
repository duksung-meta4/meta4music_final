# Generated by Django 4.1.1 on 2022-11-02 07:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_loginuser"),
        ("main_page", "0008_alter_compose_adminid_alter_lyrics_userid"),
    ]

    operations = [
        # migrations.RemoveField(model_name="images", name="_data",),
        # migrations.RemoveField(model_name="images", name="createdAt",),
        # migrations.RemoveField(model_name="images", name="imagescol",),
        migrations.RemoveField(model_name="images", name="memberid",),
        # migrations.RemoveField(model_name="images", name="updatedAt",),
        migrations.AddField(
            model_name="images",
            name="adminid",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="account.loginuser",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="images",
            name="canvas",
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
