//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

/*

██████╗ ██╗███████╗██████╗ ███████╗██████╗ ███████╗███████╗
██╔══██╗██║██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝
██║  ██║██║███████╗██████╔╝█████╗  ██████╔╝███████╗█████╗  
██║  ██║██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔══╝  
██████╔╝██║███████║██║     ███████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
                                                           
 ██████╗ █████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗           
██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔═══██╗          
██║     ███████║██╔████╔██║██║██╔██╗ ██║██║   ██║          
██║     ██╔══██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║          
╚██████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝          
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝           
                                                           
By: @CaminoScan https://caminoscan.com
*/

/**
 * @title DisperseCaminoV1
 * @notice Optimized contract for batch distribution of ERC20 tokens and native currency
 */
contract DisperseCaminoV1 {
    using Address for address payable;

    error ArrayLengthMismatch();
    error InsufficientValue();
    error TooMuchCAMReceived();
    error EmptyRecipients();
    error TransferFailed();

    event TokensDispersed(address indexed token, uint256 total, uint256 count);
    event CaminoDispersed(uint256 total, uint256 count);

    /**
     * @notice Distributes ERC20 tokens to multiple recipients
     * @param token The ERC20 token to distribute
     * @param recipients Array of recipient addresses
     * @param values Array of token amounts
     */
    function disperseERC20(IERC20 token, address[] calldata recipients, uint256[] calldata values) external virtual {
        // Input validation
        uint256 len = recipients.length;
        if (len == 0) revert EmptyRecipients();
        if (len != values.length) revert ArrayLengthMismatch();

        // Calculate total in unchecked block since we're using ^0.8
        uint256 total;
        unchecked {
            for (uint256 i; i < len; ++i) {
                total += values[i];
            }
        }

        // Bulk transfer tokens to this contract
        bool success = token.transferFrom(msg.sender, address(this), total);
        if (!success) revert TransferFailed();

        // Distribute tokens
        unchecked {
            for (uint256 i; i < len; ++i) {
                success = token.transfer(recipients[i], values[i]);
                if (!success) revert TransferFailed();
            }
        }

        emit TokensDispersed(address(token), total, len);
    }

    /**
     * @notice Distributes native currency to multiple recipients
     * @param recipients Array of recipient addresses
     * @param values Array of amounts to send
     */
    function disperseCamino(address[] calldata recipients, uint256[] calldata values) external payable virtual {
        uint256 len = recipients.length;
        if (len == 0) revert EmptyRecipients();
        if (len != values.length) revert ArrayLengthMismatch();

        // Calculate total and verify sent value
        uint256 total;
        unchecked {
            for (uint256 i; i < len; ++i) {
                total += values[i];
            }
        }
        if (msg.value < total) revert InsufficientValue();

        // Fail if too much CAM received
        if (msg.value > total) revert TooMuchCAMReceived();

        // Distribute native currency
        unchecked {
            for (uint256 i; i < len; ++i) {
                payable(recipients[i]).sendValue(values[i]);
            }
        }

        emit CaminoDispersed(total, len);
    }
}
