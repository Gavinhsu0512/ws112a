export function list(contacts) {
    let list = [];
    for (let contact of contacts) {
      list.push(`
        <li>
          <h2>${contact.name}</h2>
          <p>電話號碼: ${contact.tel}</p>
          <p><a href="/contact/${contact.id}">詳細資訊</a></p>
        </li>
      `);
    }
    let content = `
      <h1>通訊錄</h1>
      <p>你有<strong>${contacts.length}</strong>位聯絡人!</p>
      <p><a href="/contact/search">查詢聯絡人</a></p>
      <p><a href="/contact/new">新增聯絡人</a></p>
      <ul id="contacts">
        ${list.join('\n')}
      </ul>
    `;
    return layout('通訊錄', content);
  }
  
  export function newContact() {
    return layout('新增聯絡人', `
      <h1>新增聯絡人</h1>
      <p>聯絡人資訊</p>
      <form action="/contact" method="post">
        <p><input type="text" placeholder="姓名" name="name" required></p>
        <p><input type="tel" placeholder="電話號碼" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" name="tel" required></p>
        <p><input type="submit" value="新增"></p>
      </form>
    `);
  }
  
  export function show(contact) {
    return layout(contact.name, `
      <h1>${contact.name}</h1>
      <p>電話號碼: ${contact.tel}</p>
    `);
  }
  
  export function search() {
    return layout('查詢聯絡人', `
      <h1>查詢聯絡人</h1>
      <form action="/contact/search" method="post">
        <p><input type="text" placeholder="姓名" name="name" required></p>
        <p><input type="submit" value="查詢"></p>
      </form>
    `);
  }
  
  export function notfound() {
    return layout('查詢聯絡人', `
      <h1>查詢聯絡人</h1>
      <form action="/contact/search" method="post">
        <p><input type="text" placeholder="姓名" name="name" required></p>
        <p><input type="submit" value="查詢"></p>
      </form>
      <h1>查無此人</h1>
    `);
  }
  