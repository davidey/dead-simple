exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': /^vendor||^bower_components/  
    stylesheets:
      defaultExtension: 'styl'
      joinTo:
        'css/app.css': /^app\/styles/
    templates:
      joinTo: 'templates.js'
  plugins:
    babel:
        ignore: [
            /^(bower_components|vendor|node_modules)/
            'app/legacyES5Code/**/*'
        ]