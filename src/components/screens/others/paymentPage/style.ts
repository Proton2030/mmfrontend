import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  screenshotImage: {
    width: '100%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginTop: 10, // Optional: Space above the image
    borderRadius: 10, // Optional: Rounded corners for the image
    backgroundColor: '#f0f0f0', // Optional: Background color to ensure visibility
  },

  screenshotContainer: {
    marginTop: 10, // Add some margin above the container
    padding: 8, // Padding inside the container
    backgroundColor: '#f0f0f0', // A light gray background color
    borderRadius: 8, // Rounded corners for the container
  },
  screenshotText: {
    color: '#333', // Darker text color for better visibility
    fontSize: 14, // Font size for the text
    lineHeight: 20, // Line height for better readability
  },

  paymentOptionButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000', // Add a shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // The opacity of the shadow
    shadowRadius: 3.84, // The blur radius of the shadow
    elevation: 5, // Elevation for Android to achieve the shadow effect
  },

  paymentOptionText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  manualPaymentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentIdLabel: {
    fontSize: 16,
    color: 'white',
    marginRight: 8,
  },
  paymentIdValue: {
    fontSize: 16,
    color: 'white',
    marginRight: 12,
    fontWeight: 'bold',
  },
  copyButton: {
    fontSize: 14,
    color: 'blue',
  },
  uploadButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#8324ff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
