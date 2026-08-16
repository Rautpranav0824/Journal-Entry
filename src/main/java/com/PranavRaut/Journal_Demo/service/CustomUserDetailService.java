package com.PranavRaut.Journal_Demo.service;

import com.PranavRaut.Journal_Demo.entity.User;
import com.PranavRaut.Journal_Demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);

        if (user != null) {

            String[] roles = (user.getRoles() != null && !user.getRoles().isEmpty())
                    ? user.getRoles().toArray(new String[0])
                    : new String[]{"USER"}; // Default fallback role

            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUserName())
                    .password(user.getPassword())
                    .roles(roles)
                    .build();
        }

        throw new UsernameNotFoundException("User not found: " + username);
    }
}
