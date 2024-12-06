(function () {
    function addFigureToImages(hook,vm) {
      hook.beforeEach(function (content) {
        return content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
            const path = vm.route.path;
            const pathWithoutFileName = path.substring(0, path.lastIndexOf('/'))+"/";
          return `
  <figure>
    <img src="${pathWithoutFileName}${src}" alt="${alt}">
    ${alt ? `<figcaption>${alt}</figcaption>` : ""}
  </figure>`;
        });
      });
    }
  
    // Register the plugin with Docsify
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = (window.$docsify.plugins || []).concat(addFigureToImages);
  })();
  