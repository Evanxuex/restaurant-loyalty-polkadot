(function() {
  // Check if already authenticated
  const isAuthenticated = sessionStorage.getItem('auth');
  
  if (!isAuthenticated) {
    // Define your password
    const correctPassword = 'your-secret-password';
    
    // Prompt for password
    let password = prompt('Please enter the password to access this site:');
    
    // Check password
    if (password !== correctPassword) {
      alert('Incorrect password. Access denied.');
      // Redirect to a blank page or reload to prompt again
      window.location.href = 'about:blank';
      return;
    }
    
    // Store authentication in session storage
    sessionStorage.setItem('auth', 'true');
  }
})();
