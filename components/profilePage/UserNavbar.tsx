import React from 'react';
import { Group, Avatar, Text, Box, useMantineTheme, AVATAR_SIZES } from '@mantine/core';

interface user {
    avatar: string;
    userName: string;
    userData: string;
}

export function User({ avatar, userName, userData }: user) {
  const theme = useMantineTheme();

  return (
    <Box>
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
              {userData}
            </Text>
          </Box>

        </Group>
    </Box>
  );
}