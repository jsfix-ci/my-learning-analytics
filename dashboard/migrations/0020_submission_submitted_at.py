# Generated by Django 2.2.14 on 2020-07-29 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0019_course_data_last_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='submitted_at',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Submitted DateTime'),
        ),
    ]
