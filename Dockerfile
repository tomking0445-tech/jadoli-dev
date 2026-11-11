FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html i18n.js portfolio.html portfolio-en.html llms.txt /usr/share/nginx/html/
COPY img /usr/share/nginx/html/img
EXPOSE 8080
