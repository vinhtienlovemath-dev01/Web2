exports.seed = async function(knex) {
  await knex('customer').del()
  await knex('customer').insert([
    {username: 'customer01', fullname: 'Phan Vĩnh Tiến', email: 'tien@st.umt.edu.vn', tel: '0123456789'},
    {username: 'customer02', fullname: 'Phan Nguyễn Duy Kha', email: 'kha@st.umt.edu.vn', tel: '0223456789'},
    {username: 'customer03', fullname: 'Trần Mạnh Đức', email: 'duc@st.umt.edu.vn', tel: '0323456789'},
    {username: 'customer04', fullname: 'Hoàng Quang Huy', email: 'huy@st.umt.edu.vn', tel: '0423456789'},
  ]);
};