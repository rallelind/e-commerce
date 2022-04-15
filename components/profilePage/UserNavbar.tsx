import React from 'react';
import { Group, Avatar, Text, Box, useMantineTheme, AVATAR_SIZES } from '@mantine/core';

interface user {
    avatar: string;
    userName: string;
    userEmail: string;
}

export function User({ avatar, userName, userEmail }: user) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
        <Group>
          <Avatar
            src={avatar}
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {userName}
            </Text>
            <Text color="dimmed" size="xs">
              {userEmail}
            </Text>
          </Box>

        </Group>
    </Box>
  );
}