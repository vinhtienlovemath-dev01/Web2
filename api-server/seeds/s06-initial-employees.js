exports.seed = async function(knex) {
  await knex('employee').del()
  await knex('employee').insert([
    {fullname: 'Nguyễn Văn A', email: 'a@st.umt.edu.vn', tel: '0123456789', address: 'Hà Nội'},
    {fullname: 'Nguyễn Văn B', email: 'b@st.umt.edu.vn', tel: '0223456789', address: 'Hà Nội'},
    {fullname: 'Nguyễn Văn C', email: 'c@st.umt.edu.vn', tel: '0323456789', address: 'Hà Nội'},
    {fullname: 'Nguyễn Văn D', email: 'd@st.umt.edu.vn', tel: '0423456789', address: 'Hà Nội'},
  ]);
};