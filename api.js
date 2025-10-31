// Function to fetch users and summarize their info
function fetchUsersAndSummarize() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      // Check if response is OK
      if (!response.ok) {
        throw new Error("Failed to fetch users. Status:" + response.status);
      }
      // Return JSON data
      return response.json();
    })
    .then(function (users) {
      // Case-insensitive filter: find users whose city includes "c"
      const filtered = users.filter((u) =>
        u.address.city.toLowerCase().includes("c")
      );

      // Map smaller objects with key informations
      const smallList = filtered.map((u) => ({
        id: u.id,
        name: u.name,
        city: u.address.city,
        company: u.company.name,
      }));

      console.clear();
      console.log("Total users fetched:", users.length);
      console.log("Users whose city includes 'C'", smallList.length);

      if (smallList.length === 0) {
        console.log("No users found with 'C' in their city name.");
      } else {
        smallList.forEach(function (user) {
          console.log(
            `User ID ${user.id}: ${user.name} from ${user.city} works at ${user.company}`
          );
        });
      }
    })
    .catch(function (error) {
      // Handle errors
      console.error("Error:", error.message);
    });
}

// Run the main function
fetchUsersAndSummarize();


// Function to test error handling
function testError() {
  fetch("https://jsonplaceholder.typicode.com/u5ers") // wrong URL
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Invalid request. Status:" + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Data fetched successfully:", data);
    })
    .catch(function (error) {
      console.error("Test Error Handling Works:", error.message);
    });
}

// Run error test
testError();
