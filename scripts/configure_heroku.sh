#!/bin/bash
# IMPORTANT: previo a ejecutar este script asegurar de estar logueado al heroku CLI

set -e

heroku apps:create $APP_NAME
