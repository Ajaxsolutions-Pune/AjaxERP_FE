$(document).ready(function() {
});
function logout()
{
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href='login';
}