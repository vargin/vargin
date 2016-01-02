(function() {
  'use strict';

  var ngApplication = {
    application: '{"id":"4013f806-000b-4a91-b2ca-2f19c9138734","name":"(Empty App)","description":"Empty App Description","serviceRoot":{"id":"bc5bcb33-f73b-440a-b72a-6596caed8b2e","type":"container","children":[],"overrides":{"current":"default","root":{"name":"__predefined__","isEnabled":true,"isEditorVisible":false,"groups":[["styles",[["display","block"],["min-height","5rem"],["min-width","5rem"]]]],"children":[{"name":"default","isEnabled":true,"isEditorVisible":true,"groups":[["styles",[["align-items","stretch"],["display","flex"],["min-height","0"],["min-width","100%"]]]]}]}},"triggers":null},"pages":[{"id":"7544cda3-62a4-49f6-9a7f-a7b7370823e3","name":"(Default Page)","root":{"id":"bc5bcb33-f72b-440a-b72a-6596caed8b2e","type":"container","children":[{"id":"df5df285-a57c-4772-853f-cd59d4f5df36","type":"label","children":[],"overrides":{"current":"default","root":{"name":"__predefined__","isEnabled":true,"isEditorVisible":false,"groups":[["styles",[["align-items","center"],["display","inline"]]]],"children":[{"name":"default","isEnabled":true,"isEditorVisible":true,"groups":[["properties",[["text","Hello World"]]],["styles",[["font-size","2rem"],["justify-content","center"],["color","#ff1500"],["flex-grow","0"],["display","flex"]]]]}]}},"triggers":null},{"id":"f20bcf1c-b23b-42fb-a57d-4fe719df4343","type":"button","children":[],"overrides":{"current":"default","root":{"name":"default","isEnabled":true,"isEditorVisible":true,"groups":[["properties",[["text","Press Me"]]],["styles",[["color","#0006ff"],["font-size","2rem"],["font-weight","bold"],["border","0.3rem dashed yellow"]]]]}},"triggers":null}],"overrides":{"current":"default","root":{"name":"__predefined__","isEnabled":true,"isEditorVisible":false,"groups":[["styles",[["display","block"],["min-height","5rem"],["min-width","5rem"]]]],"children":[{"name":"default","isEnabled":true,"isEditorVisible":true,"groups":[["styles",[["display","flex"],["padding","1rem"],["flex-direction","column"]]]]}]}},"triggers":null}}]}',
    css: 'vargin-input {          display: inline-flex;        }        vargin-input > input {          flex: 1;          background: inherit;          color: inherit;          border: none;          font: inherit;          padding: 0;          margin: 0;        }      .vargin-container { align-items: stretch;background-color: transparent;border: none;color: inherit;display: block;flex-basis: auto;flex-direction: row;flex-grow: 0;flex-shrink: 1;font-size: inherit;font-weight: normal;justify-content: flex-start;margin: 0;min-height: 5rem;min-width: 5rem;padding: 0; }.vargin-bc5bcb33-f72b-440a-b72a-6596caed8b2e--default { display: flex;flex-direction: column;padding: 1rem; }.vargin-label { align-items: center;background-color: transparent;color: inherit;display: inline;flex-basis: auto;flex-grow: 0;flex-shrink: 1;font-size: inherit;font-weight: normal;justify-content: flex-start;margin: 0;opacity: 1;padding: 0;text-decoration: none; }.vargin-df5df285-a57c-4772-853f-cd59d4f5df36--default { color: #ff1500;display: flex;flex-grow: 0;font-size: 2rem;justify-content: center; }.vargin-f20bcf1c-b23b-42fb-a57d-4fe719df4343--default { background-color: transparent;background-image: ;background-position: center;background-repeat: repeat;background-size: auto;border: 0.3rem dashed yellow;border-radius: 0;color: #0006ff;flex-basis: auto;flex-grow: 0;flex-shrink: 1;font-size: 2rem;font-weight: bold;height: auto;line-height: auto;padding: 0; }'
  };

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = ngApplication.css;
  document.getElementsByTagName('head')[0].appendChild(style);

  System.register(
    'src/compilers/angular/template/app-description',
    [],
    function(exports) {
      return {
        setters: [],
        execute: function() {
          exports('application', ngApplication.application);
        }
      };
    }
  );

  document.addEventListener('DOMContentLoaded', function () {
    System.import('src/compilers/angular/template/app-controller').catch(
      function(e) { console.error(e); }
    );
  });
})(window);