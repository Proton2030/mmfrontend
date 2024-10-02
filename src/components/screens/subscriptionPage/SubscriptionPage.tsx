// import React, { useState, useEffect, useContext } from 'react';
// import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// // import { styles } from './subcriptionStyles';
// import { COLORS } from '../../../constants/theme';
// import { useTheme } from 'react-native-paper';
// import { api } from '../../../utils/api';
// import { useNavigation } from '@react-navigation/native';
// import UiContext from '../../../contexts/uiContext/UIContext';

// import FeatherIcon from 'react-native-vector-icons/Feather';

// const prices = [
//   {
//     price: '$99.99',
//     label: 'Lifetime',
//     description: 'Pay Once - Access Forever',
//   },
//   { price: '$24.99', label: 'Yearly', description: 'Includes Family Sharing' },
//   { price: '$9.99', label: 'Monthly', description: 'Includes Family Sharing' },
// ];

// const items = [
//   {
//     label: 'Monthly',
//     users: <AntDesign name="checkcircle" size={15} />,
//     price: '$9.9',
//     description: '10 Credits',
//     points: ['Unlimited access', 'Priority support', 'Free updates'],
//   },
//   {
//     label: 'Yearly',
//     users: <AntDesign name="checkcircle" size={15} />,
//     price: '$99.99',
//     description: '120 Credits',
//     points: ['Unlimited access', 'Priority support', 'Free updates'],
//   },
//   {
//     label: 'Weekly',
//     users: <AntDesign name="checkcircle" size={15} />,
//     price: '$4.99',
//     description: '5 Credits',
//     points: ['Limited access', 'Priority support', 'Limited updates'],
//   },
// ];

// export const SubscriptionPage = ({ handlePaymentUpdate }: any) => {
//   const {
//     ui: { theme },
//   } = useContext(UiContext);
//   const navigation = useNavigation<any>();
//   const { colors } = useTheme();
//   const [value, setValue] = useState(0);
//   const [displayedPoints, setDisplayedPoints] = useState([]);
//   const [plans, setPlans] = useState([]);

//   const getAllPlans = async () => {
//     const response = await api.payment.getALlPlans();
//     console.log('=====>plan parent', response);
//     setPlans(response);
//   };

//   // useEffect(() => {
//   //   setDisplayedPoints([]);

//   //   const { points } = items[value];

//   //   points.forEach((point, index) => {
//   //     setTimeout(() => {
//   //       setDisplayedPoints((prevPoints): any => [...prevPoints, point]);
//   //     }, index * 100);
//   //   });

//   //   return () => clearTimeout();
//   // }, [value]);
//   const [selected, setSelected] = useState(0);
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await api.payment.getALlPlans();
//         // Assuming `response` is an array of plan objects
//         setPlans(response);
//       } catch (error) {
//         console.error('Error fetching plans:', error);
//       }
//     };

//     fetchPlans();
//   }, []);

//   return (
//     <>
//       <LinearGradient
//         colors={[
//           theme === 'DARK' ? '#00004d' : '#DA0C81',
//           theme === 'DARK' ? '#201658' : '#FF4B91',
//           theme === 'DARK' ? '#1130a2' : '#7360DF',
//         ]}
//         style={styles.gradientBackground}
//       >
//         <SafeAreaView style={{ flex: 1 }}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Subscription Plans</Text>
//             {/* <View style={styles.radioContainer}>
//               {items.map((plan: any, index) => {
//                 const isActive = value === index;

//                 return (
//                   <TouchableOpacity style={{ flexBasis: '95%' }} key={plan._id} onPress={() => setValue(index)}>
//                     <View style={[styles.radio, isActive && styles.radioActive]}>
//                       <View style={styles.radioTop}>
//                         <Text style={isActive ? styles.radioLabelActive : styles.radioLabel}>{plan.plan_name || <>44</>}</Text>
//                         <Text style={isActive ? styles.radioUsersActive : styles.radioUsers}>
//                           <AntDesign name="checkcircle" size={15} />
//                         </Text>
//                       </View>
//                       <Text style={isActive ? styles.radioPriceActive : styles.radioPrice}>৳ {plan.plan_price || <>44</>}</Text>
//                       <View
//                         style={{
//                           width: 'auto',
//                           backgroundColor: index === 0 ? 'transparent' : 'white',
//                           borderRadius: 20,
//                           paddingHorizontal: 8,
//                           paddingVertical: 4,
//                           marginTop: 4,
//                           height: 26,
//                         }}
//                       >
//                         {index === 0 ? null : (
//                           <Text style={{ color: 'black', fontWeight: '600', fontSize: 12 }}>SAVE 60%</Text>
//                         )}
//                       </View>
//                       <Text style={isActive ? styles.radioDescriptionActive : styles.radioDescription}>
//                         Chat Count: {plan?.chat_count}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View> */}

//             <View style={styles.form}>
//               <View>
//                 {prices.map((item, index) => {
//                   const isActive = selected === index;
//                   return (
//                     <TouchableWithoutFeedback
//                       key={index}
//                       onPress={() => setSelected(index)}
//                     >
//                       <View
//                         style={[
//                           styles.radio,
//                           isActive
//                             ? { borderColor: '#F82E08', backgroundColor: '#feeae6' }
//                             : {},
//                         ]}>
//                         <FeatherIcon
//                           color={isActive ? '#F82E08' : '#363636'}
//                           name={isActive ? 'check-circle' : 'circle'}
//                           size={24} />

//                         <View style={styles.radioBody}>
//                           <View>
//                             <Text style={styles.radioLabel}>{item.label}</Text>

//                             <Text style={styles.radioText}>{item.description}</Text>
//                           </View>

//                           <Text
//                             style={[
//                               styles.radioPrice,
//                               isActive && styles.radioPriceActive,
//                             ]}>
//                             {item.price}
//                           </Text>
//                         </View>
//                       </View>
//                     </TouchableWithoutFeedback>
//                   );
//                 })}
//               </View>

//               <View>
//                 <TouchableOpacity
//                   onPress={() => {
//                     // handle onPress
//                   }}>
//                   <View style={styles.btn}>
//                     <Text style={styles.btnText}>Continue</Text>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => {
//                     // handle onPress
//                   }}>
//                   <View style={styles.btnEmpty}>
//                     <Text style={styles.btnEmptyText}>Restore Purchase</Text>
//                   </View>
//                 </TouchableOpacity>

//                 <Text style={styles.formFooterText}>
//                   Plan renews automatically. You can manage and cancel your
//                   subscription in App Store.
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//         <TouchableOpacity onPress={() => handlePaymentUpdate(plans[value])}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: 8,
//               paddingVertical: 10,
//               paddingHorizontal: 20,
//               backgroundColor: 'white',
//               marginTop: 'auto',
//               marginHorizontal: 24,
//               marginBottom: 20,
//             }}
//           >
//             <Text style={[styles.btnText, { color: 'black' }]}>Continue</Text>
//           </View>
//         </TouchableOpacity>
//       </LinearGradient>
//     </>

//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#181818',
//     marginBottom: 12,
//   },
//   gradientBackground: {
//     flex: 1,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
//   container: {
//     marginTop: 60,
//   },
//   subtitle: {
//     fontSize: 15,
//     lineHeight: 20,
//     fontWeight: '500',
//     color: '#889797',
//   },
//   /** Header */
//   header: {
//     paddingHorizontal: 24,
//     marginBottom: 28,
//   },
//   headerAction: {
//     width: 40,
//     height: 40,
//     borderRadius: 9999,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ffdada',
//     marginBottom: 16,
//   },
//   /** Form */
//   form: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//     paddingBottom: 24,
//     justifyContent: 'space-between',
//     paddingHorizontal: 24,
//   },
//   formFooterText: {
//     marginTop: 12,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#929292',
//     textAlign: 'center',
//   },
//   /** Radio */
//   radio: {
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     borderWidth: 2,
//     borderColor: 'transparent',
//     borderStyle: 'solid',
//     borderRadius: 24,
//     marginBottom: 16,
//     backgroundColor: '#fff',
//   },
//   radioBody: {
//     paddingLeft: 10,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//   },
//   radioLabel: {
//     fontSize: 19,
//     fontWeight: '700',
//     color: '#1d1d1d',
//   },
//   radioText: {
//     marginTop: 6,
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#889797',
//   },
//   radioPrice: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1d1d1d',
//   },
//   radioPriceActive: {
//     transform: [
//       {
//         scale: 1.2,
//       },
//     ],
//   },
//   /** Button */
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderWidth: 1,
//     backgroundColor: '#F82E08',
//     borderColor: '#F82E08',
//   },
//   btnText: {
//     fontSize: 17,
//     lineHeight: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   btnEmpty: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderWidth: 1.5,
//     backgroundColor: 'transparent',
//     borderColor: '#F82E08',
//     marginTop: 12,
//   },
//   btnEmptyText: {
//     fontSize: 17,
//     lineHeight: 22,
//     fontWeight: 'bold',
//     color: '#F82E08',
//   },
// });

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';

import { COLORS } from '../../../constants/theme';
import { styles } from './subcriptionStyles';
import Plans from './plans/Plans';
import Payment from './payment/Payment';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';

// const prices = [
//   {
//     price: '৳ 9.99',
//     label: 'Basics',
//     description: '1',
//   },
//   { price: '৳ 29.99', label: 'Silver', description: '10' },
//   { price: '৳ 29.99', label: 'Silver', description: '10' },
//   { price: '৳ 29.99', label: 'Silver', description: '10' },
//   { price: '৳ 29.99', label: 'Silver', description: '10' },
//   { price: '৳ 99.99', label: 'Golden', description: '20' },
// ];

export const SubscriptionPage = ({ closeModal }: any) => {
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(0);
  const [plans, setPlans] = useState<any>([]);

  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const getAllPlans = async () => {
    const response = await api.payment.getAllPlans();
    setPlans(response);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const handlePaymentUpdate = async (plan: any) => {
    if (!user?._id || !plan?._id) return;
    // navigation.replace('PaymentVerification', { tranId: 'tran_1727848874969_h720nyzwm', planId: plan._id });
    const response = await api.payment.initPayment(user?._id, plan?._id);
    closeModal();
    console.log('====>url', response.paymentUrl);
    if (response) {
      const { paymentUrl, tranId } = response;
      navigation.navigate('Payment', {
        paymentUrl,
        tranId,
        planId: plan._id,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {page === 0 ? (
        <Plans
          prices={plans}
          selected={selected}
          setSelected={setSelected}
          nextPage={nextPage}
          handlePaymentUpdate={handlePaymentUpdate}
        />
      ) : (
        <Payment
          prevPage={prevPage}
          closeModal={closeModal}
          handlePaymentUpdate={handlePaymentUpdate}
          selectedPlan={plans[selected]}
        />
      )}
      <TouchableOpacity onPress={getAllPlans}></TouchableOpacity>
    </SafeAreaView>
  );
};
