import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBarComponent = React.memo(({ isSearch, setSearchQuery, handleRefresh, searchQuery, handleSearch }: any) => {
    return (
        isSearch ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Searchbar
                    style={{
                        flex: 1,
                        margin: 10,
                        backgroundColor: "#fff5f9",
                    }}
                    elevation={3}
                    placeholder="Search User"
                    onChangeText={(query) => { setSearchQuery(query) }}
                    onClearIconPress={handleRefresh}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                    blurOnSubmit={true}
                />
            </View>
        ) : null
    );
}, (prevProps, nextProps) => {
    // Only re-render if isSearch prop changes
    return prevProps.isSearch === nextProps.isSearch;
});

export default SearchBarComponent;
