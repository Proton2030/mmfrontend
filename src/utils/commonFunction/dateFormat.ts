export function formatDate(dateString: any) {
    const date = new Date(dateString);

    // Define options for the formatting
    const options: any = {
        year: 'numeric',
        month: 'short', // This will give the abbreviated month name (e.g., "Oct")
        day: 'numeric'
    };

    // Convert the date to the desired format
    return date.toLocaleDateString('en-US', options);
}

// Example usage:
const formattedDate = formatDate("2024-10-02T07:28:15.759Z");
console.log(formattedDate);  // Output: "Oct 2, 2024"
