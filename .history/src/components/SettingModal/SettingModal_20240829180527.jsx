


// const handleSave = (event) => {
//     event.preventDefault();
  
    
//     if (newPassword !== repeatNewPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }
  
    
//     if (!name || !email || !currentPassword) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
  
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Invalid email address.");
//       return;
//     }
  
//     dispatch(updateUser({ photo, gender, name, email, currentPassword, newPassword }))
//       .unwrap()
//       .then(() => {
//         toast.success("User information updated successfully.");
//         onClose(); 
//       .catch((error) => {
//         toast.error("Error updating user information: " + error.message);
//       });
//   };
  