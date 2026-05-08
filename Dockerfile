FROM nginx:alpine

COPY index.html dashboard.html alerts.html analytics.html banks.html settings.html /usr/share/nginx/html/
COPY styles.css scripts.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
