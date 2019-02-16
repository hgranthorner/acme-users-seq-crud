const updatePage = (users, id) => {
  return `
  <html>
  <head>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' />
  </head>
  <body>
    <div class='container'>
    <h1>Acme Users CRUD-SEQ</h1>
    <ul class='list-group'>
    ${users
      .map(user => {
        return `
        <li class="list-group-item">
          <a href="/users/${user.id}">${user.firstName} ${user.lastName}</a>
          <form method='post' action='/users/${user.id}?_method=delete'>
            <button class='btn btn-danger'>
              Delete
            </button>
          </form>
        </li>
      `
      })
      .join('')}
    </ul>
    <div style='border: solid 1px black; border-radius: 5px; margin-top: 10px; padding: 10px'>
    <form method='post' action='/users/:${id}?_method=put' >
      <input name='firstName' value='${users.find(user => user.id == id).firstName}'/>
      <input name='lastName' value='${users.find(user => user.id == id).lastName}'/>
      <button>Update</button>
    <a href='/users'>Cancel</a>
    </form>
    </div>
    </div>
  </body>
</html>
    `
}

module.exports = updatePage
