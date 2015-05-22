# BDEV.tv site repository

Бессвязный девелоп — сообщество объединяющее разработчиков желающих делиться процессом создания своих проектов в формате трансляций в реальном времени.

### Установка сайта локально
Краткая инструкция по установке локальной копии сайта для помощи в разработке:
* Установите [Git](https://git-scm.com/), [Node.js](https://nodejs.org) и [MongoDB](www.mongodb.org)
* Создайте каталог для клона сайта
* Установите *Yeoman generator for KeystoneJS*:  ```npm install -g generator-keystone```
* Запустите генератор *Keystone* ```yo keystone```:

| Question | Answer |
| ------------- |-------------|
| What is the name of your project? | Bdev |
| Would you like to use Jade, Swig, Nunjucks or Handlebars for templates? | hbs |
| Would you like to use LESS or SASS for stylesheets? | less |
| Would you like to include a Blog?	| Yes |
| Would you like to include an Image Gallery?	| Yes |
| Would you like to include a Contact Form? 	| No |
| What would you like to call the User model?	| Yes |
| Enter an email address for the first Admin user: 	| info@bdev.tv |
| Enter a password for the first Admin user:	| Admin |
| Would you like to include gulp or grunt?	| gulp |
| Would you like to create a new directory for your project?	| no |
| Would you like to include Email configuration in your project? 	| no |
| Please enter your Cloudinary URL: 	| CREATE YOU OWN ACCOUNT |
| would you like to include extra code comments in your project?	| yes |

* В ручную склонируйте репозиторий: 
```
git init
git remote add origin https://github.com/alerdenisov/bdev-git.git
git fetch
git checkout -t origin/master
git reset --hard origin/master
git status
```
* По очереди удалите все лишние файлы из статуса: ```rm -rf PATH/TO/FILE```
* Запустите mongod
* Запустите сервер сайта: ```node keystone```
