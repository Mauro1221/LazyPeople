# docker-django-sass

This quickstart guide demonstrates how to use [Docker](https://www.docker.com/) to containerize [Django](https://www.djangoproject.com/), [Postgres](https://www.postgresql.org/) and [Redis](http://redis.io/) for rapid development. This boilerplate uses [Gulp](https://gulpjs.com/) for frontend workflow automation, [Sass](https://sass-lang.com/) for CSS pre-processing and [Babel](https://babeljs.io/) with ES2015 preset for JavaScript compilation.

Docker is supported on Linux, Windows and macOS. If you haven't used Docker before, be sure to check out the [Installation Guide](https://docs.docker.com/engine/installation/) and [Quickstart Guide](https://docs.docker.com/compose/django/).

## Requirements

* Docker Desktop 2.3.0 or higher

## Setup

1. Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop) is installed and running.
2. Run the following commands:

```bash
git clone https://github.com/philipp-x/docker-django-sass.git docker-django-sass
# Clone repository
cd docker-django-sass
# Change directory
docker-compose run --rm web django-admin startproject mysite .
# Create a Django project
```

3. Replace `DATABASES` inside `settings.py` with the following:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': '5432',
    }
}
```

4. Add `CACHES` to your `settings.py`:

```python
# Cache
# https://docs.djangoproject.com/en/2.2/ref/settings/#caches

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://redis:6379/0',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

5. Edit `ALLOWED_HOSTS` inside `settings.py` and add your IP address:

```python
ALLOWED_HOSTS = ['*']
```

6. Edit `TEMPLATES` inside `settings.py` and add the following to `DIRS`:

```python
# Application definition
# https://docs.djangoproject.com/en/2.2/howto/overriding-templates/

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        ...
    },
]
```

7. Add `STATICFILES_DIRS` to your `settings.py`:

```python
# Static files
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
```

8. Run the following commands:

```bash
docker-compose run --rm web python manage.py migrate
# Applying migrations
docker-compose run --rm web python manage.py createsuperuser
# Create superuser
```

9. Run `docker-compose up` from the top level directory for your project.

At this point, your Django application should be running at port `8000` on your Docker host. On Docker Desktop for Mac and Docker Desktop for Windows, go to `http://localhost:8000` on a web browser to see the Django welcome page.

## Upgrade

1. Stop all running containers.
2. Run `git pull` in your working directory to fetch and merge remote changes.
3. Run `docker-compose build --pull` to rebuild the service images.

## Command Reference

### Docker

* Management

```bash
docker stop $(docker ps -a -q)
# Stop running containers
docker rmi $(docker images -q -f dangling=true)
# Delete dangling images
docker volume rm $(docker volume ls -q -f dangling=true)
# Delete dangling volumes
```

### Django

* i18n

```bash
docker-compose run --rm web django-admin.py makemessages -l en
# Pull out all strings marked for translation
docker-compose run --rm web django-admin.py compilemessages
# Compile .po files to .mo files
```

### Gulp

* Compile files

```bash
docker-compose run --rm web gulp watch
# Watch file changes
docker-compose run --rm web gulp sass
# Compile Sass files
docker-compose run --rm web gulp compile
# Compile JavaScript files
```

## Contribution

You are very welcome improving this boilerplate, especially the documentation always needs love. Feel free to send us your feedback in the form of issues and pull requests.

Always write your commit messages in the present tense. Your commit message should describe what the commit, when applied, does to the code and not what you did to the code.