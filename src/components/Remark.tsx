// Copyright 2021 Parity Technologies (UK) Ltd.
// This file is part of Parity Bridges UI.
//
// Parity Bridges UI is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Parity Bridges UI is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Parity Bridges UI.  If not, see <http://www.gnu.org/licenses/>.

import React, { useState } from 'react';
import { Button, Container, Input } from 'semantic-ui-react';
import styled from 'styled-components';

import { useTransactionContext } from '../contexts/TransactionContext';
import useLoadingApi from '../hooks/useLoadingApi';
import useSendMessage from '../hooks/useSendMessage';
import { TransactionTypes } from '../types/transactionTypes';
interface Props {
  className?: string;
}

const Remark = ({ className }: Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [remarkInput, setRemarkInput] = useState('0x');
  const [executionStatus, setExecutionStatus] = useState('');
  const areApiReady = useLoadingApi();
  const { estimatedFee } = useTransactionContext();
  const message = {
    error: 'Error sending remark',
    successfull: '- Remark was executed succesfully'
  };
  const { isButtonDisabled, sendLaneMessage } = useSendMessage({
    input: remarkInput,
    isRunning,
    message,
    setExecutionStatus,
    setIsRunning,
    type: TransactionTypes.REMARK
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExecutionStatus('');
    setRemarkInput(event.target.value);
  };

  if (!areApiReady) {
    return null;
  }

  return (
    <Container className={className}>
      <Input onChange={onChange} value={remarkInput} />
      <Button disabled={isButtonDisabled()} onClick={sendLaneMessage}>
        Send Remark
      </Button>
      <p>{estimatedFee && `Estimated source Fee: ${estimatedFee}`}</p>
      <div className="status">
        <p>{executionStatus !== '' && executionStatus}</p>
      </div>
    </Container>
  );
};

export default styled(Remark)`
  display: flex !important;
  justify-content: center !important;
`;
