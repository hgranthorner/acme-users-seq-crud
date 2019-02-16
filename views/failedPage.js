const failedPage = array => html`
  <html>
    <h1>Acme Users CRUD-SEQ</h1>
    <p>
      ${array
        .map(name => {
          return `Validation error: Validation notEmpty on ${name} failed`
        })
        .join(',')}
    </p>
  </html>
`

module.exports = failedPage
