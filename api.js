// Function to fetch users and summarize their info
function fetchUsersAndSummarize() {
  console.log("*********** SUCCESS TEST **********");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to fetch users. Status: " + response.status);
      }
      return response.json();
    })
    .then(function (users) {
      console.log("Total users fetched:", users.length);
      console.log("--- All Users (ID, Name, Company, City) ---");

      users.forEach(function (user) {
        console.log(
          `User ID ${user.id}: ${user.name} works at ${user.company.name}, City: ${user.address.city}`
        );
      });

      // Filter users whose city includes 'C'
      const filtered = users.filter((u) =>
        u.address.city.toLowerCase().includes("c")
      );

      // Map smaller objects with key information
      const smallList = filtered.map((u) => ({
        id: u.id,
        name: u.name,
        city: u.address.city,
        companyName: u.company.name, 
      }));

      console.log("Users whose city includes 'C'");
      console.log("Count:", smallList.length);

      if (smallList.length === 0) {
        console.log("No users found with 'C' in their city name.");
      } else {
        smallList.forEach(function (user) {
          console.log(
            `User ID ${user.id}: ${user.name} works at ${user.companyName}, City: ${user.city}` 
          );
        });
      }

      console.log("**********************************");
    })
    .catch(function (error) {
      // Handle errors
      console.error("Error:", error.message);
    });
}

// Function to test error handling with a wrong URL
function testError() {
  console.log("************ ERROR TEST ***********");

  fetch("https://jsonplaceholder.typicode.com/u5ers") // wrong URL
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Invalid request. Status: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Data fetched successfully:", data);
    })
    .catch(function (error) {
      // Display error message
      console.error("Test Error Handling Works:", error.message);
      console.log("*********************************");
    });
}

// Run the main function
fetchUsersAndSummarize();

// Run error test after successful one
testError(); 
