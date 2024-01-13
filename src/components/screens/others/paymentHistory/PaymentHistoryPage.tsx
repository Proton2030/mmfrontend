import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { List, Title, Divider, Text, Portal, Button } from 'react-native-paper';

const PaymentHistoryPage = () => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePaymentPress = (payment: any) => {
        setSelectedPayment(payment);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Title style={styles.title}>Payment History</Title>
            </View>

            <Divider />

            <List.Section style={styles.listSection}>
                <PaymentItem
                    title="Subscription Renewal"
                    amount="$19.99"
                    date="Jan 15, 2023"
                    success={true}
                    onPress={() => handlePaymentPress("Subscription Renewal")}
                />

                <PaymentItem
                    title="Online Purchase"
                    amount="$35.50"
                    date="Feb 02, 2023"
                    success={true}
                    onPress={() => handlePaymentPress("Online Purchase")}
                />

                <PaymentItem
                    title="Service Fee"
                    amount="$5.00"
                    date="Mar 10, 2023"
                    success={false}
                    onPress={() => handlePaymentPress("Service Fee")}
                />

                {/* Add more payment items as needed */}
            </List.Section>

            <PaymentDetailsModal
                visible={modalVisible}
                payment={selectedPayment}
                closeModal={closeModal}
            />
        </ScrollView>
    );
};

const PaymentItem = ({ title, amount, date, success, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <List.Item
                title={title}
                description={`Amount: ${amount} | Date: ${date}`}
                left={() => (
                    <List.Icon
                        icon={success ? 'check-circle' : 'close-circle'}
                        color={success ? '#008000' : '#FF0000'}
                    />
                )}
            />
        </TouchableOpacity>
    );
};

const PaymentDetailsModal = ({ visible, payment, closeModal }: any) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Title>Payment Details</Title>
                        <Text>{`Title: ${payment}`}</Text>
                        {/* Add more payment details as needed */}
                        <Button mode="contained" onPress={closeModal} style={styles.modalButton}>
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    listSection: {
        marginTop: 20,
        paddingLeft: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalButton: {
        marginTop: 20,
    },
});

export default PaymentHistoryPage;
