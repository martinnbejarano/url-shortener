# Generated by Django 5.0.2 on 2024-02-13 00:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_shortlink_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shortlink',
            old_name='origianl_url',
            new_name='original_url',
        ),
    ]
