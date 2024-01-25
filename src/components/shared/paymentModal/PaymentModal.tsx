import { View, Text, Modal } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Paragraph, Title } from 'react-native-paper'

const PaymentModal = React.memo(({ modalVisible, setModalVisible, styles, handlePaymentUpdate, name }: any) => {
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Title>Choose a Subscription</Title>
                    <View style={styles.subscriptionRow}>
                        <Card style={styles.subscriptionCard}>
                            <View style={{ padding: 5, display: 'flex' }}>
                                <Avatar.Icon icon="star" size={20} />
                                <Text style={{ fontWeight: 'bold' }}>Low Package</Text>
                            </View>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>&nbsp;500৳</Text>
                            <Text style={{ fontSize: 12 }}>&nbsp;5 persons</Text>

                            <Button style={{ marginTop: 20, padding: 0 }} mode="contained" onPress={() => handlePaymentUpdate(0)}>pay</Button>

                        </Card>

                        <Card style={styles.subscriptionCard}>
                            <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                <Text style={{ fontWeight: 'bold' }}>Medium Package</Text>

                            </View>

                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>&nbsp;1000৳</Text>
                            <Text style={{ fontSize: 12 }}>&nbsp;10 persons</Text>

                            <Button style={{ marginTop: 20, padding: 0 }} mode="contained" onPress={() => handlePaymentUpdate(0)}>pay</Button>
                        </Card>

                        <Card style={styles.subscriptionCard}>
                            <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                <Text style={{ fontWeight: 'bold' }}>High Package</Text>

                            </View>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>&nbsp;2000৳</Text>
                            <Text style={{ fontSize: 12 }}>&nbsp;20 persons</Text>

                            <Button style={{ marginTop: 20 }} mode="contained" onPress={() => handlePaymentUpdate(0)}>pay</Button>

                        </Card>
                    </View>

                    {/* Special Buy Card */}
                    <Card style={styles.specialBuyCard}>
                        <Card.Title title="Special Offer" subtitle="Only 150৳-   " left={(props) => <Avatar.Icon {...props} icon="sale" />} />
                        <Card.Content>
                            <Paragraph> chat with {name?.split(' ')[0]}! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained" onPress={() => handlePaymentUpdate(3)} style={styles.buyButton}>
                                Pay Now
                            </Button>
                        </Card.Actions>
                    </Card>
                    <Button onPress={() => setModalVisible(false)} >Close</Button>
                </View>
            </View>
        </Modal>
    )
})

export default PaymentModal