import React, { useContext } from 'react';
import AuthContext from '../../../contexts/authContext/authContext';

export const profileComplete = () => {
    const { user } = useContext<any>(AuthContext);

    const userFields = [
        'full_name', 'gender', 'age', 'marital_status', 'state', 'height', 'weight',
        'body_color', 'occupation', 'work_place', 'monthly_income', 'education', 'islamic_education',
        'salah', 'sawum', 'fathers_name', 'fathers_occupation', 'mothers_name', 'mothers_occupation',
        'no_of_brothers', 'no_of_sisters', 'financial_condition', 'status', 'profile_image_url'
    ];

    // Calculate percentage of profile completeness
    const filledFields = userFields.filter(field => user?.[field]);
    const totalFields = userFields.length;
    const completionPercentage = Math.round((filledFields.length / totalFields) * 100);

    // Return true if profile is 100% complete, otherwise false
    return completionPercentage === 100;
};
