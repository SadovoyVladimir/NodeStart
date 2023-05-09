document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    await remove(id)
    event.target.closest('li').remove()
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const title = await getTitle(id)
    
    let newTitle = prompt('Enter new title', title)
    if (newTitle) {
      await edit(id, newTitle)
    }
  }

})

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function getTitle(id) {
  const response = await fetch(`/${id}`, {method: 'GET'})
  const title = await response.json()
  return title
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title})
  })
}
