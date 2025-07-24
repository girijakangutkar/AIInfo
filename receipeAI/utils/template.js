exports.buildHTML = ({ content }) => `
<html>
  <head>
    <style>
      body { font-family: Arial, padding: 20px; color: #333; }
      h1 { color: #2b8a3e; font-size: 24px; }
      .section { margin-bottom: 20px; }
      pre { background: #f9f9f9; padding: 10px; border-radius: 5px; }
    </style>
  </head>
  <body>
    <h1>AI-Powered Recipe</h1>
    <div class="section">
      <pre>${content}</pre>
    </div>
  </body>
</html>
`;
