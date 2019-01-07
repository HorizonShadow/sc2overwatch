export const uploadDefaults = {
    upload: {
        __typename: 'Upload',
        players: [],
        step: 0,
        evidence: '',
        selectedPlayer: '',
        gameId: ''
    }
};  

export const uploadResolvers = {
    Mutation: {
        setSelectedPlayer: (_, variables, { cache, getCacheKey }) => {
            cache.writeData({
                data: {
                    upload: {
                        __typename: 'Upload',
                        selectedPlayer: variables.player
                    }
                }
            });
            return null;
        },
        setEvidence: (_, variables, { cache }) => {
            cache.writeData({
                data: {
                    upload: {
                        __typename: 'Upload',
                        evidence: variables.evidence
                    }
                }
            })
            return null;
        }
    }
};