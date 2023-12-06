package com.fractal.technical_test_cap.security;

import com.fractal.technical_test_cap.Model.Authority;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

/*

Tu Proyecto                                               Spring Security
-------------------------------------------------        -------------------

Entidad                    Elemento con Datos               Elemento con Datos
-------                    ---------                        ---------
User (Class)        <-- SecurityUser (Class)       --->  UserDetails (Interface)
Authority (Class)   <-- SecurityAuthority (Class)  --->  GrantedAuthority (Interface)

                         Servicio                           Servicio
                         ----------                         ----------
                        UserDetailsServiceImpl (Class) ---> UserDetailsService (Interface)

 */

@Data
@AllArgsConstructor
public class SecurityAuthority implements GrantedAuthority {

    private Authority authority;

    @Override
    public String getAuthority() {
        return authority.getName().toString();
    }



}
