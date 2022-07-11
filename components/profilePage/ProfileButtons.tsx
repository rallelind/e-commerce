import React from 'react';
import { ThemeIcon, UnstyledButton, Group, Text, Indicator } from '@mantine/core';
import ConditionalWrapper from "../utils/ConditionalWrapper"

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  userSeen: boolean;
  ownerSeen: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ProfileButton({ buttonData }) {

  return (
    <ConditionalWrapper
      condition={buttonData.userSeen === false || buttonData.ownerSeen === false}
      wrapper={children => <Indicator color="grape" className='mr-[5%]' label="NEW" size={16}>{children}</Indicator>}
    >
        <UnstyledButton
            onClick={buttonData.onClick}
            sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon size={30} color={buttonData.color} variant="light">
              {buttonData.icon}
            </ThemeIcon>

            <Text size="sm">{buttonData.label}</Text>
          </Group>
        </UnstyledButton>
      </ConditionalWrapper>
  );
}
